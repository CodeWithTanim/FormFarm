<?php

class Router
{
    protected $routes = [];

    public function get($url, $action)
    {
        $this->routes['GET'][$url] = $action;
    }

    public function post($url, $action)
    {
        $this->routes['POST'][$url] = $action;
    }

    public function dispatch($url)
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $url = '/' . ltrim($url, '/');
        $url = rtrim($url, '/');
        $url = $url === '' ? '/' : $url;

        // Check for static routes
        if (isset($this->routes[$method][$url])) {
            return $this->callAction($this->routes[$method][$url]);
        }

        // Check for dynamic routes (e.g., /f/{form_key})
        foreach ($this->routes[$method] as $route => $action) {
            $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[a-zA-Z0-9_-]+)', $route);
            $pattern = "#^" . $pattern . "$#";

            if (preg_match($pattern, $url, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                return $this->callAction($action, $params);
            }
        }

        http_response_code(404);
        echo "404 Not Found";
    }

    protected function callAction($action, $params = [])
    {
        if (is_callable($action)) {
            return call_user_func_array($action, $params);
        }
        list($controller, $method) = explode('@', $action);
        $controller = new $controller();
        return call_user_func_array([$controller, $method], $params);
    }
}
