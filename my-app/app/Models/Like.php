<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\LikeBadRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Bad;
use Illuminate\Support\Facades\DB;

class Like extends Model
{
    /** @use HasFactory<\Database\Factories\ThreadFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'diary_id',
        'user_id',
    ];

    /**
     * usersテーブルとのリレーション
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * diariesテーブルとのリレーション
     */
    public function diary()
    {
        return $this->belongsTo(Diary::class);
    }

    /**
     * いいね、バッドの登録更新
     * 
     * @param LikeBadRequest $request
     * @param boolean $isAdd
     */
    public function updateLike($request, &$isAdd)
    {
        $isAdd = false;
        $user = Auth::user();
        // いいね更新
        try {
            $retryTimes = 3;
            DB::transaction(function () use ($request, $user, &$isAdd) {
                // いいね登録ずみか確認
                $likes = Like::where('diary_id', $request->diary_id)->where('user_id', $user->id)->get();
                if (count($likes) > 0) {
                    foreach ($likes as $like) {
                        $like->delete();
                    }
                } else {
                    $this->diary_id = $request->diary_id;
                    $this->user_id = $user->id;
                    $this->save();
                    $isAdd = true;
                }
                // バッドがあれば削除
                $bads = Bad::where('diary_id', $request->diary_id)->where('user_id', $user->id)->get();
                if (count($bads) > 0) {
                    foreach ($bads as $bad) {
                        $bad->delete();
                    }
                }
            }, $retryTimes);
        } catch (\Throwable $e) {
            Log::error('Error Like in updateLike: ' . $e->getMessage());
            // リダイレクト
            return 'いいねの更新に失敗しました。';
        }

        return null;
    }
}
