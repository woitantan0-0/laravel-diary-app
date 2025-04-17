<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Diary;
use App\Models\Comment;
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
        User::factory(3)->create();
        Diary::factory(5)->create();
        Comment::factory(5)->create();
        Thread::factory(5)->create();
    }
}
