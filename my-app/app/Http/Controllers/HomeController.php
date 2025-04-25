<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diary;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * ホームページの表示機能
     */
    public function index()
    {
        // 人気の日記一覧を20件取得
        $popularDiaries = Diary::with('user')
            ->where('is_public', 1)
            ->orderBy('good_count', 'desc')
            ->take(20)
            ->get();
        
        // 最新の日記一覧を20件取得
        $latestDiaries = Diary::with('user')
            ->where('is_public', 1)
            ->orderBy('created_at', 'desc')
            ->take(20)
            ->get();

        // セッションに保存されたメッセージを取得
        $message = session('success');
        $error_message = session('error');

        // ビューにデータを渡す
        return Inertia::render('Home', [
            'popularDiaries' => $popularDiaries,
            'latestDiaries' => $latestDiaries,
            'tab' => 'home',
            'message' => $message,
            'error_message' => $error_message,
        ]);
    }

    /**
     * ホームページの一覧表示機能
     */
    public function list(Request $request)
    {
        // getパラメータの取得
        $search = $request->input('search');
        // ログインユーザの取得
        $user = Auth::user();

        // 公開日記一覧を取得
        $query = Diary::with('user');

        // ログインユーザの投稿した日記はプライベートも取得
        if ($user) {
            $query->where(function ($query) use ($user) {
                $query->where('is_public', 1)
                      ->orWhere('user_id', $user->id);
            });
        } else {
            // 未ログインユーザは公開日記のみ取得
            $query->where('is_public', 1);
        }

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
            ->orderBy('created_at', 'desc')
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
