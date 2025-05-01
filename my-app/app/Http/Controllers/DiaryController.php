<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Diary;
use App\Models\Comment;
use Inertia\Inertia;
use App\Http\Requests\DiaryRequest;
use App\Http\Requests\LikeBadRequest;
use App\Models\Bad;
use App\Models\Like;
use Illuminate\Support\Facades\Auth;

class DiaryController extends Controller
{
    /**
     * 日記詳細画面の表示機能
     * @param int $id 日記ID
     * @return \Illuminate\Http\Response
     */
    public function detail($id)
    {
        // 対象日記の詳細情報を取得
        $diary = Diary::with(['user'])
            ->where('id', $id)
            ->withCount(['likes', 'bads'])
            ->firstOrFail();
        
        // 対象日記のコメント一覧を取得
        $comments = Comment::with(['user', 'threads.user'])
            ->where('diary_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        // いいねバッド情報取得
        $user = Auth::user();
        $likeState = "";
        if ($user) {
            $like = Like::where('diary_id', $id)
                ->where('user_id', $user->id)
                ->count();
            $bad = Bad::where('diary_id', $id)
                ->where('user_id', $user->id)
                ->count();
            
            if ($like > 0) {
                $likeState = "like";
            } else if ($bad > 0) {
                $likeState = "bad";
            }
        }
        
        // セッションに保存されたメッセージを取得
        $message = session('success');
        $error_message = session('error');
        
        // ビューにデータを渡す
        return inertia::render('Diary/Detail', [
            'diary' => $diary,
            'comments' => $comments,
            'likeState' => $likeState,
            'message' => $message,
            'error_message' => $error_message,
        ]);
    }

    /**
     * 日記投稿画面の表示機能
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // ビューにデータを渡す
        return inertia::render('Diary/Create');
    }

    /**
     * 日記投稿機能
     * @param DiaryRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(DiaryRequest $request)
    {
        // 日記の作成
        $diaryModel = new Diary();
        $diary = $diaryModel->createDiary($request);

        // リダイレクト
        return redirect()->route('diary.detail', ['id' => $diary->id])
            ->with('success', '日記を投稿しました。');
    }

    /**
     * 日記編集画面の表示機能
     * @param int $id 日記ID
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // 対象日記の詳細情報を取得
        $diary = Diary::with(['user'])
            ->where('id', $id)
            ->firstOrFail();
        
        // 日付のフォーマットをYYYY/MM/DDからYYYY-MM-DDに変える
        $day = explode('/', $diary->target_date);
        $diary->target_date_origin = $day[0] . '-' . $day[1] . '-' . $day[2];

        // ビューにデータを渡す
        return inertia::render('Diary/Edit', [
            'diary' => $diary,
        ]);
    }

    /**
     * 日記編集機能
     * @param DiaryRequest $request
     * @param int $id 日記ID
     * @return \Illuminate\Http\Response
     */
    public function update(DiaryRequest $request)
    {
        // 日記の更新
        $diaryModel = new Diary();
        $diary = $diaryModel->updateDiary($request);

        // リダイレクト
        return redirect()->route('diary.detail', ['id' => $request->id])
            ->with('success', '日記を更新しました。');
    }

    /**
     * 返信削除機能
     * 
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        try {
            $status = 'error';
            $message = '日記の削除に失敗しました。';
            $diary = Diary::find($request->id);
            if ($diary) {
                $retryTimes = 3;
                DB::transaction(function () use ($diary) {
                    // 日記に紐づくデータを削除
                    $comments = $diary->comments()->get();
                    foreach ($comments as $comment) {
                        // 日記に紐づく返信を削除
                        $comment->threads()->delete();
                        // コメント削除
                        $comment->delete();
                    }
                    // いいね削除
                    $likes = $diary->likes()->get();
                    foreach ($likes as $like) {
                        $like->delete();
                    }
                    // バッド削除
                    $bads = $diary->bads()->get();
                    foreach ($bads as $bad) {
                        $bad->delete();
                    }
                    // 日記削除
                    $diary->delete();
                }, $retryTimes);
                $status = 'success';
                $message = '日記を削除しました。';
            } else {
                // リダイレクト
                return redirect()->route('diary.detail', ['id' => $request->id])
                    ->with($status, $message);
            }

            // 詳細画面にリダイレクト
            return redirect()
                ->route('home.index')
                ->with($status, $message);

        } catch (\Throwable $e) {
            Log::error('Error DiaryController in destroy: ' . $e->getMessage());
            // リダイレクト
            return redirect()->route('diary.detail', ['id' => $request->id])
                ->with('error', '日記の削除に失敗しました。');
        }
    }

    /**
     * いいね更新機能
     * 
     * @param LikeBadRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function saveLikes(LikeBadRequest $request)
    {
        // いいねバッド更新
        $likeStatus = '';
        if ($request->like_state == 'like') {
            $likeModel = new Like();
            if ($err = $likeModel->updateLike($request, $isAdd)) {
                return $this->setErrorResponse($err);
            };
            $likeStatus = $isAdd ? 'like' : '';
        } else if ($request->like_state == 'bad') {
            $badModel = new Bad();
            if ($err = $badModel->updateBad($request, $isAdd)) {
                return $this->setErrorResponse($err);
            };
            $likeStatus = $isAdd ? 'bad' : '';
        }
        // 件数取得
        $diary = Diary::where('id', $request->diary_id)
            ->withCount(['likes', 'bads'])
            ->firstOrFail();

        return response()->json(
            [
                'likeState' => $likeStatus,
                'likesCount' => $diary->likes_count,
                'badsCount' => $diary->bads_count,
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * APIエラーレスポンスセット
     * @param string $message
     */
    private function setErrorResponse($message)
    {
        return response()->json(
            ['message' => $message],
            500,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
