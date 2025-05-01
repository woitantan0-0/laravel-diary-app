<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LikeBadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * "{"diary_id":22,"like_state":"like"}"
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
            'diary_id' => 'required',
            'like_state' => 'required|string',
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
            'diary_id' => '日記ID',
            'like_state' => 'いいねバッドステータス',
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
            'diary_id.required' => ':attributeは必須です。',
            'like_state.required' => ':attributeは必須です。',
            'like_state.string' => ':attributeは文字列である必要があります。',
        ];
    }
}
