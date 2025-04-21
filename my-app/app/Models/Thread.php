<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        return date('Y年m月d日', strtotime($value));
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
}
