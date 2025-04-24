<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ThreadRequest;
use App\Models\Thread;

class ThreadController extends Controller
{
    /**
     * 返信登録機能
     * 
     * @param ThreadRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ThreadRequest $request, $id) 
    {
        // コメントの登録処理
        $threadModel = new Thread();
        $Thread = $threadModel->createThread($request);

        // 詳細画面にリダイレクト
        return redirect()
            ->route('diary.detail', ['id' => $id])
            ->with('success', '返信を投稿しました。');
    }
}
