<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\DiaryRequest;

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
        'is_public',
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

    /**
     * 日記を登録する
     * 
     * @param DiaryRequest $request
     * @return Diary
     */
    public function createDiary(DiaryRequest $request)
    {
        $this->title = $request->title;
        $this->body = $request->body;
        $this->target_date = $request->target_date;
        $this->is_public = $request->is_public;
        $this->user_id = $request->user()->id;
        $this->good_count = 0;
        $this->bad_count = 0;
        $this->save();
        return $this;
    }
}
