<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('{current_team}')
    ->middleware([
        'auth',
        'verified',
        EnsureTeamMembership::class,
    ])
    ->group(function (): void {
        Route::get(
            'dashboard',
            DashboardController::class
        )->name('dashboard');

        Route::get('sales', function () {
            return Inertia::render('sales');
        })->name('sales');

        Route::get('orders', function () {
            return Inertia::render('orders');
        })->name('orders');
        Route::get('products', function () {
            return Inertia::render('products');
        })->name('products');
        Route::get('inventory', function () {
            return Inertia::render('inventory');
        })->name('inventory');
    });

Route::middleware(['auth'])
    ->group(function (): void {
        Route::post(
            'invitations/{invitation}/accept',
            [TeamInvitationController::class, 'accept']
        )->name('invitations.accept');

        Route::delete(
            'invitations/{invitation}',
            [TeamInvitationController::class, 'decline']
        )->name('invitations.decline');
    });

require __DIR__.'/settings.php';