<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class ThreadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'comment_id' => 'required',
            'thread_comment' => 'required|string|max:255',
        ];
    }

    /**
     * リクエストのnameなどの値を再定義するメソッド
     * 
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'comment_id' => 'コメントID',
            'thread_comment' => '返信コメント',
        ];
    }

    /**
     * バリデーションエラーメッセージをカスタマイズするメソッド
     * 
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'comment_id.required' => ':attributeは必須です。',
            'thread_comment.required' => ':attributeは必須です。',
            'thread_comment.string' => ':attributeは文字列である必要があります。',
            'thread_comment.max' => ':attributeは:max文字以内で入力してください。',
        ];
    }

    /**
     * エラーレスポンスを上書きして、追加情報を付与する
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $exception = $validator->getException();

        throw (new $exception($validator))
            ->errorBag($this->errorBag)
            ->errorBag($this->input('comment_id'))
            ->redirectTo($this->getRedirectUrl());
    }
}
