<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Comment;
use App\Http\Requests\CommentRequest;

class CommentController extends Controller
{
    /**
     * コメント登録機能
     * 
     * @param CommentRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommentRequest $request)
    {
        // コメントの登録処理
        $commentModel = new Comment();
        $comment = $commentModel->createComment($request);

        // 詳細画面にリダイレクト
        return redirect()
            ->route('diary.detail', ['id' => $request->diary_id])
            ->with('success', 'コメントを投稿しました。');
    }

    /**
     * 返信削除機能
     * 
     * @param Request $request
     * @param int $diaryId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, $diaryId)
    {
        $status = 'error';
        $message = '返信の削除に失敗しました。';
        $comment = Comment::find($request->comment_id);
        if ($comment) {
            $retryTimes = 3;
            DB::transaction(function () use ($comment) {
                // コメントに紐づく返信を削除
                $comment->threads()->delete();
                // コメント削除
                $comment->delete();
            }, $retryTimes);
            $status = 'success';
            $message = '返信を削除しました。';
        }

        // 詳細画面にリダイレクト
        return redirect()
            ->route('diary.detail', ['id' => $diaryId])
            ->with($status, $message);
    }
}
