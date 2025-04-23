<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diary;
use App\Models\Comment;
use Illuminate\Container\Attributes\Auth;
use Inertia\Inertia;
use App\Http\Requests\DiaryRequest;
use Illuminate\Support\Facades\Log;

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
            ->firstOrFail();
        
        // 対象日記のコメント一覧を取得
        $comments = Comment::with(['user', 'threads.user'])
            ->where('diary_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();
        
        // セッションに保存されたメッセージを取得
        $message = session('success');
        
        // ビューにデータを渡す
        return inertia::render('Diary/Detail', [
            'diary' => $diary,
            'comments' => $comments,
            'message' => $message,
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
}
