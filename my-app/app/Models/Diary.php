<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diary extends Model
{
    /** @use HasFactory<\Database\Factories\DiaryFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'body',
        'target_date',
        'user_id',
        'good_count',
        'bad_count',
    ];

    /**
     * 日記対象日のフォーマットを変えるアクセサメソッド
     * 
     * @return string
     */
    public function getTargetDateAttribute($value)
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
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * threadsテーブルとのリレーション
     */
    public function threads()
    {
        return $this->hasMany(Thread::class);
    }
}
