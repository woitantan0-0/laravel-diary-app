<?php

namespace Database\Seeders;

use App\Models\Bad;
use App\Models\User;
use App\Models\Diary;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Thread;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(5)->create();
        Diary::factory(20)->create();
        Comment::factory(10)->create();
        Thread::factory(6)->create();
        Like::factory(1000)->create();
        Bad::factory(1000)->create();
    }
}
