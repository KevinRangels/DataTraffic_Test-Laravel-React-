<?php

namespace App\Http\Middleware;

use Closure;

class ApiKeyValidate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->has("api_key")) {
            return response()->json([
              'status' => 403,
              'message' => 'Acceso no autorizado',
            ], 403);
          }
      
          if ($request->has("api_key")) {
            $api_key = "key_cur_prod_DataTraffic";
            if ($request->input("api_key") != $api_key) {
              return response()->json([
                'status' => 403,
                'message' => 'Acceso no autorizado',
              ], 403);
            }
          }
      
          return $next($request);
    }
}
