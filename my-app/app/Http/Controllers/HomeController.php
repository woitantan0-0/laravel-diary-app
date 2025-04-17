<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diary;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * ホームページの表示機能
     */
    public function index()
    {
        // 人気の日記一覧を20件取得
        $popularDiaries = Diary::with('user')
            ->orderBy('good_count', 'desc')
            ->take(20)
            ->get();
        
        // 最新の日記一覧を20件取得
        $latestDiaries = Diary::with('user')
            ->orderBy('created_at', 'desc')
            ->take(20)
            ->get();

        // ビューにデータを渡す
        return Inertia::render('Home', [
            'popularDiaries' => $popularDiaries,
            'latestDiaries' => $latestDiaries,
        ]);
    }
}
