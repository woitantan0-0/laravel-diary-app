<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DiaryRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'target_date' => 'required|date',
            'is_public' => 'boolean',
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
            'title' => 'たいとる。',
            'body' => 'ほんぶん。',
            'target_date' => 'ひにち。',
            'is_public' => 'こうかい',
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
            'title.required' => ':attributeは必須です。',
            'title.string' => ':attributeは文字列である必要があります。',
            'title.max' => ':attributeは:max文字以内で入力してください。',
            'body.required' => ':attributeは必須です。',
            'body.string' => ':attributeは文字列である必要があります。',
            'target_date.required' => ':attributeは必須です。',
            'target_date.date' => ':attributeは日付形式で入力してください。',
            'is_public.boolean' => ':attributeは真偽値である必要があります。',
        ];
    }
}
