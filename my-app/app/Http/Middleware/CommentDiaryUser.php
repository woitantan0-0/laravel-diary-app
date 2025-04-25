<?php

namespace App\Http\Middleware;

use App\Models\Comment;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class CommentDiaryUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 日記の情報を取得
        $comment = Comment::with(['user'])
            ->where('id', $request->comment_id)
            ->firstOrFail();
        // 日記の作成者とログインユーザーが一致する場合
        if ($comment->user_id !== $request->user()->id) {
            // 一致しない場合は403エラーを返す
            abort(403, 'Unauthorized action.');
        }
        // 一致する場合は次のミドルウェアに処理を渡す
        return $next($request);
    }
}
