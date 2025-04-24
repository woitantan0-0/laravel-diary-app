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
     * @param int $id
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
        $thread = Thread::find($request->thread_id);
        if ($thread) {
            $thread->delete();
            $status = 'success';
            $message = '返信を削除しました。';
        }

        // 詳細画面にリダイレクト
        return redirect()
            ->route('diary.detail', ['id' => $diaryId])
            ->with($status, $message);
    }
}
