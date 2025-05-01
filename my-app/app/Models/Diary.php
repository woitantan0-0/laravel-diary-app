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
    ];

    /**
     * 日記対象日のフォーマットを変えるアクセサメソッド
     * 
     * @return string
     */
    public function getTargetDateAttribute($value)
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
     * likesテーブルとのリレーション
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * badsテーブルとのリレーション
     */
    public function bads()
    {
        return $this->hasMany(Bad::class);
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
        $this->save();
        return $this;
    }

    /**
     * 日記を更新する
     * 
     * @param DiaryRequest $request
     * @return Diary
     */
    public function updateDiary(DiaryRequest $request)
    {
        // 対象日記の詳細情報を取得
        $diary = Diary::with(['user'])
            ->where('id', $request->id)
            ->firstOrFail();
        
        // 日記の更新
        $diary->title = $request->title;
        $diary->body = $request->body;
        $diary->target_date = $request->target_date;
        $diary->is_public = $request->is_public;
        $diary->user_id = $request->user()->id;
        $diary->save();

        return $this;
    }
}
