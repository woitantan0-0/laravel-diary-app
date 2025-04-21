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
            'tab' => 'home',
        ]);
    }

    /**
     * ホームページの一覧表示機能
     */
    public function list(Request $request)
    {
        // getパラメータの取得
        $search = $request->input('search');

        // 人気の日記一覧を取得
        $query = Diary::with('user');

        // 検索条件の追加
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('body', 'like', "%{$search}%")
                      ->orWhere('target_date', 'like', "%{$search}%");
            });
        }
        // 検索結果を取得
        $diaries = $query
            ->orderBy('good_count', 'desc')
            ->orderBy('id', 'asc')
            ->paginate(10);

        // ビューにデータを渡す
        return Inertia::render('Home', [
            'diaries' => $diaries,
            'tab' => 'list',
            'search' => $search,
        ]);
    }
}
