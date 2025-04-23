<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        // dd($request->user());
        // コメントの登録処理
        $commentModel = new Comment();
        $comment = $commentModel->createComment($request);

        // 詳細画面にリダイレクト
        return redirect()
            ->route('diary.detail', ['id' => $request->diary_id])
            ->with('success', 'コメントを投稿しました。');
    }
}
