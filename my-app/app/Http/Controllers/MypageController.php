<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diary;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MypageController extends Controller
{
    /**
     * マイページ - diary
     */
    public function index(Request $request)
    {
        // getパラメータの取得
        $search = $request->input('search');
        // ログインユーザの取得
        $user = Auth::user();

        // 自分の日記一覧を取得
        $query = Diary::with('user')->where('user_id', $user->id);

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
            ->withCount(['likes', 'bads'])
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'asc')
            ->paginate(10);

        // ビューにデータを渡す
        return Inertia::render('Dashboard', [
            'diaries' => $diaries,
            'tab' => 'diary',
            'search' => $search,
        ]);
    }
}
