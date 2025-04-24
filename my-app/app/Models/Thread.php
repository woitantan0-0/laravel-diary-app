<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\ThreadRequest;

class Thread extends Model
{
    /** @use HasFactory<\Database\Factories\ThreadFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'comment',
        'user_id',
        'comment_id',
    ];

    /**
     * 登録日のフォーマットを変えるアクセサメソッド
     * 
     * @return string 
     */
    public function getCreatedAtAttribute($value)
    {
        return date('Y/m/d', strtotime($value));
    }

    /**
     * usersテーブルとのリレーション
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * commentsテーブルとのリレーション
     */
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }

    /**
     * スレッド登録処理
     * @param ThreadRequest $request
     * @return Thread
     */
    public function createThread(ThreadRequest $request)
    {
        $this->comment = $request->thread_comment;
        $this->user_id = $request->user()->id;
        $this->comment_id = $request->comment_id;
        $this->save();
        return $this;
    }
}
