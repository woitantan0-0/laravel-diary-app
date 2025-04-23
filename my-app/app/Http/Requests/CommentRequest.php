<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
            'comment' => 'required|string|max:255',
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
            'comment' => 'コメント',
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
            'comment.required' => ':attributeは必須です。',
            'comment.string' => ':attributeは文字列である必要があります。',
            'comment.max' => ':attributeは:max文字以内で入力してください。',
        ];
    }
}
