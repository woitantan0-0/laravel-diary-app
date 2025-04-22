<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Diary>
 */
class DiaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->country() . 'の' . fake()->city() . '旅行',
            'body' => fake()->realText(200),
            'target_date' => fake()->dateTimeBetween('-1 month', '+1 month'),
            'is_public' => fake()->boolean(),
            'user_id' => User::factory(),
            'good_count' => fake()->numberBetween(0, 100),
            'bad_count' => fake()->numberBetween(0, 100),
        ];
    }
}
