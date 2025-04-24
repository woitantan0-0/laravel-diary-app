<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/diary/create', [\App\Http\Controllers\DiaryController::class, 'create'])->name('diary.create');
    Route::post('/diary/store', [\App\Http\Controllers\DiaryController::class, 'store'])->name('diary.store');
    Route::post('/diary/comment/store', [\App\Http\Controllers\CommentController::class, 'store'])->name('comment.store');
    Route::post('/diary/{id}/thread/store', [\App\Http\Controllers\ThreadController::class, 'store'])->name('thread.store');

    Route::middleware('canUpdate')->group(function () {
        Route::get('/diary/{id}/edit', [\App\Http\Controllers\DiaryController::class, 'edit'])->name('diary.edit');
        Route::post('/diary/update', [\App\Http\Controllers\DiaryController::class, 'update'])->name('diary.update');
    });
});

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home.index');
Route::get('/list', [\App\Http\Controllers\HomeController::class, 'list'])->name('home.list');
Route::get('/diary/{id}', [\App\Http\Controllers\DiaryController::class, 'detail'])->name('diary.detail');

require __DIR__.'/auth.php';
