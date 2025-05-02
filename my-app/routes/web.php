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

Route::get('/dashboard', [\App\Http\Controllers\MypageController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Route::get('/dashboard', [\App\Http\Controllers\MypageController::class, 'index'])->name('dashboard.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/diary/create', [\App\Http\Controllers\DiaryController::class, 'create'])->name('diary.create');
    Route::post('/diary/store', [\App\Http\Controllers\DiaryController::class, 'store'])->name('diary.store');
    Route::post('/diary/comment/store', [\App\Http\Controllers\CommentController::class, 'store'])->name('comment.store');
    Route::post('/diary/{id}/thread/store', [\App\Http\Controllers\ThreadController::class, 'store'])->name('thread.store');
    Route::post('/api/likes', [\App\Http\Controllers\DiaryController::class, 'saveLikes']);

    Route::middleware('canUpdate')->group(function () {
        Route::get('/diary/{id}/edit', [\App\Http\Controllers\DiaryController::class, 'edit'])->name('diary.edit');
        Route::post('/diary/update', [\App\Http\Controllers\DiaryController::class, 'update'])->name('diary.update');
        Route::post('/diary/destroy', [\App\Http\Controllers\DiaryController::class, 'destroy'])->name('diary.destroy');
    });

    Route::middleware('canUpdateComment')->group(function () {
        Route::post('/diary/{id}/comment/destroy', [\App\Http\Controllers\CommentController::class, 'destroy'])->name('comment.destroy');
    });

    Route::middleware('canUpdateThread')->group(function () {
        Route::post('/diary/{id}/thread/destroy', [\App\Http\Controllers\ThreadController::class, 'destroy'])->name('thread.destroy');
    });
});

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home.index');
Route::get('/list', [\App\Http\Controllers\HomeController::class, 'list'])->name('home.list');
Route::get('/diary/{id}', [\App\Http\Controllers\DiaryController::class, 'detail'])->name('diary.detail');

require __DIR__.'/auth.php';
