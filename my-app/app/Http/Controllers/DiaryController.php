<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diary;
use App\Models\Comment;
use Inertia\Inertia;

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
        
        // ビューにデータを渡す
        return inertia::render('Diary/Detail', [
            'diary' => $diary,
            'comments' => $comments,
        ]);
    }
}
