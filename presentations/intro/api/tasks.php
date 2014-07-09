<?php

$tasks = array(
  array(
    'text'=> 'Fix front doors',
    'done'=> true,
    'tags'=> ['home'],
  ),
  array(
    'text'=> 'Buy beer',
    'done'=> false,
    'tags'=> ['home', 'urgent'],
  ),
  array(
    'text'=> 'Send spreadsheet',
    'done'=> true,
    'tags'=> ['work', 'urgent'],
  ),
  array(
    'text'=> 'Buy flowers',
    'done'=> false,
    'tags'=> ['wife'],
  ),
  array(
    'text'=> 'Arrange dinner',
    'done'=> false,
    'tags'=> ['wife'],
  ),
  array(
    'text'=> 'Call Jim',
    'done'=> true,
    'tags'=> ['work'],
  ),
  array(
    'text'=> 'Recharge credit card',
    'done'=> true,
    'tags'=> ['wife', 'urgent'],
  ),
  array(
    'text'=> 'Fix router',
    'done'=> false,
    'tags'=> ['home'],
  ),
  array(
    'text'=> 'Print monthly report',
    'done'=> true,
    'tags'=> ['work', 'urgent'],
  ),
);


header('Content-Type', 'application/json');

if (array_key_exists('query', parse_url($_SERVER['REQUEST_URI']))) {
  $rawQuery = explode('&', parse_url($_SERVER['REQUEST_URI'])['query']);
  $tags = [];
  $out = [];

  foreach ($rawQuery as $queryPart) {
    if (preg_match('~tag=(\w+)~', $queryPart, $matches)) {
      $tags[] = $matches[1];
    }
  }

  foreach ($tasks as $task) {
    foreach ($tags as $tag) {
      if (in_array($tag, $task['tags'])) {
        $out[] = $task;
      }
    }
  }

  echo json_encode($out);

} else {
  echo json_encode($tasks);
}
