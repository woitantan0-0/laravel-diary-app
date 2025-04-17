<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Diary;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'comment' => fake()->realText(100),
            'user_id' => User::factory(),
            'diary_id' => Diary::factory(),
        ];
    }
}
