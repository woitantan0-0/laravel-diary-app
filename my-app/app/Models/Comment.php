<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\CommentRequest;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'comment',
        'user_id',
        'diary_id',
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
     * diariesテーブルとのリレーション
     */
    public function diary()
    {
        return $this->belongsTo(Diary::class);
    }

    /**
     * threadsテーブルとのリレーション
     */
    public function threads()
    {
        return $this->hasMany(Thread::class);
    }

    /**
     * コメント登録処理
     * @param \App\Http\Requests\CommentRequest $request
     * @return Comment
     */
    public function createComment(CommentRequest $request): Comment
    {
        $this->comment = $request->comment;
        $this->user_id = $request->user()->id;
        $this->diary_id = $request->diary_id;
        $this->save();
        return $this;
    }
}
