<?php
include_once __DIR__ . '/db-cfg.php';

function queryInsertBuilder($table, $data = [])
{
    if (!$data) return '';
    $q_names  = array_map(function ($k) {
        return '`' . $k . '`';
    }, array_keys($data));
    $q_values = array_values($data);
    $q_values = array_map('queryValueConvert', $q_values);
    return 'insert into `' . $table . '` (' . implode(', ', $q_names) . ') values (' . implode(', ', $q_values) . ')';
}

function queryUpdateBuilder($table, $data = [], $filter = [], $limit = null, $offset = null)
{
    $q        = 'update `' . $table . '`';
    $q_set    = querySetter($data);
    $q        .= ' set ' . $q_set;
    $q_filter = queryFilter($filter);
    $q        .= ' where ' . $q_filter;
    $q_limit  = queryLimit($limit, $offset);
    if ($q_limit) $q .= ' limit ' . $q_limit;
    return $q;
}

/**
 * @param string|array $table  {@see queryFrom()}
 * @param string|array $select {@see querySelect()}
 * @param array|string $filter {@see queryFilter()}
 * @param array|string $order  {@see queryOrder()}
 * @param null|int $limit      {@see queryLimit()}
 * @param null|int $offset     {@see queryLimit()}
 * @param array $with          {@see queryJoin()}
 * @param array $group         {@see queryGroup()}
 * @param array $having        {@see queryFilter()}
 * @return string
 */
function querySelectBuilder($table, $select = ' * ', $filter = [], $order = [], $limit = null, $offset = null, $with = [], $group = [], $having = [])
{
    $q_select = querySelect($select);
    $q_from   = queryFrom($table);
    $q        = 'select ' . $q_select . ' from ' . $q_from;
    if (!empty($with)) {
        $q_join = queryJoin($table, $with);
        $q      .= $q_join;
    }
    if (!empty($filter)) {
        $q_filter = queryFilter($filter);
        $q        .= ' where ' . $q_filter;
    }
    if (!empty($group)) {
        $q_group = queryGroup($group);
        $q       .= $q_group;
    }
    if (!empty($having)) {
        $q_having = queryFilter($having);
        $q        .= ' having ' . $q_having;
    }
    if (!empty($order)) {
        $q_order = queryOrder($order);
        if ($q_order) $q .= ' order by ' . $q_order;
    }
    if (!is_null($limit) || !is_null($offset)) {
        $q_limit = queryLimit($limit, $offset);
        if ($q_limit) $q .= ' limit ' . $q_limit;
    }
    return $q;
}

/**
 * @param string|array $table
 * @param string|array $filter
 * @param array $order
 * @param null|int $limit
 * @param null|int $offset
 * @return string
 */
function queryDeleteBuilder($table, $filter = [], $order = [], $limit = null, $offset = null)
{
    $q_from   = queryFrom($table);
    $q        = 'delete ' . 'from ' . $q_from;
    $q_filter = queryFilter($filter);
    $q        .= ' where ' . $q_filter;
    $q_order  = queryOrder($order);
    if ($q_order) $q .= ' order by ' . $q_order;
    $q_limit = queryLimit($limit, $offset);
    if ($q_limit) $q .= ' limit ' . $q_limit;
    return $q;
}


/**
 * @param $from
 * @return string
 *
 * @var $from
 * 'table_name'
 * ['table_name_1','table_name_2']
 * ['table_alias'=>'table_name']
 */
function queryFrom($from)
{
    if (is_string($from)) return $from;
    if (is_array($from)) {
        $result = [];
        foreach ($from as $alias => $table) {
            if (is_integer($alias)) $result[] = '`' . trim($table, '`') . '`';
            if (is_string($alias)) $result[] = '`' . trim($table, '`') . '` as `' . trim($alias, '`') . '`';
        }
        return implode(', ', $result);
    }
    return $from;
}

/**
 * @param $select
 * @return string
 *
 * @var $select
 * '*'
 * 'column1, sum(column2) as s'
 * ['column1','s'=>'sum(column2)']
 */
function querySelect($select)
{
    if (is_string($select)) return $select;
    if (is_array($select)) {
        $s = [];
        foreach ($select as $k => $v) {
            if (is_integer($k)) if ($v != '*') $s[] = '`' . trim($v, '`') . '`';
            else $s[] = $v;
            if (is_string($k)) $s[] = $v . ' as `' . $k . '`';
        }
        return implode(', ', $s);
    }
    return $select;
}

/**
 * @param $filter
 * @param string $concat
 * @return string
 *
 * @var $filter
 * 'column = value'
 * ['column = value','sum(price) < 10']
 * ['column'=>'value']
 * [['operator','column','value'],['like','text','%value%']]
 * [['or',['column1'=>'value1',['in','column2',['v1','v2','v3']]]]]
 * [['is not','time',null]]
 */
function queryFilter($filter, $concat = 'and')
{

    if (!$filter) return '1 = 1';
    if (is_string($filter)) return $filter;
    if (is_array($filter)) {
        $f = [];
        foreach ($filter as $k => $v) {
            if (is_string($k)) {
                $f[] = '`' . $k . '` = ' . queryValueConvert($v);
                continue;
            }
            if (is_string($v)) {
                $f[] = $v;
                continue;
            }
            if (is_array($v)) {
                $op = $v[0] ?? null;
                switch ($op) {
                    case 'and':
                    case 'or':
                        $f[] = queryFilter($v[1], $op);
                        break;
                    case '=':
                    case '!=':
                    case '>':
                    case '<':
                    case '>=':
                    case '<=':
                    case 'in':
                    case 'not in':
                    case 'is':
                    case 'is not':
                    case 'like':
                    case 'not like':
                        $name  = '`' . trim($v[1], '`') . '`';
                        $value = queryValueConvert($v[2]);
                        $f[]   = $name . ' ' . $op . ' ' . $value;
                        break;
                    case 'in json':
                        $name  = '`' . trim($v[1], '`') . '`';
                        $value = queryValueConvert($v[2]);
                        $path  = $v[3] ?? '';
                        $path  = queryValueConvert($path ? '$.' . $path : '$');
                        $f[]   = 'json_contains(' . $name . ',\'' . $value . '\',' . $path . ')';
                        break;
                }
            }
        }
        if (!$f) return '1 = 1';
        return '(' . implode(' ' . $concat . ' ', $f) . ')';
    }
    return '1 = 0';
}

function queryValueConvert($value)
{
    global $connection;
    switch (true) {
        case is_string($value):
            return '"' . mysqli_real_escape_string($connection, $value) . '"';
        case is_numeric($value):
            return floatval($value);
        case is_array($value):
            foreach ($value as &$item) $item = queryValueConvert($item);
            return '(' . implode(', ', $value) . ')';
        case is_null($value):
            return 'NULL';
    }
    return $value;
}


/**
 * @param $order
 * @return false|string
 *
 * @var $order
 * 'timestamp desc, group asc'
 * ['timestamp'=>SORT_DESC,'group'=>SORT_ASC]
 */
function queryOrder($order)
{
    if (is_string($order)) return $order;
    if (is_array($order) && !empty($order)) {
        $ordering = [];
        foreach ($order as $name => $value) {
            $ordering[] = '`' . trim($name, '`') . '` ' . ($value == SORT_ASC ? 'asc' : 'desc');
        }
        if (!empty($ordering)) return implode(', ', $ordering);
    }
    return false;
}


function queryLimit($limit, $offset)
{
    if (!is_null($limit)) return (is_null($offset) ? $limit : $offset . ', ' . $limit);
    return false;
}

/**
 * @param $q
 * @return int
 */
function queryCount($q)
{
    global $connection;
    $qCnt = 'select count(*) as `cnt` from(' . $q . ') as `cnt`';
    $qCnt = mysqli_query($connection, $qCnt);
    if ($qCnt instanceof mysqli_result) {
        $cnt = mysqli_fetch_assoc($qCnt);
        $cnt = (int)$cnt['cnt'];
        return $cnt;
    }
    return 0;
}

/**
 * @param $data
 * @return string
 *
 * @var $data
 * ['column1'=>'value1','column2'=>'value2']
 */
function querySetter($data)
{
    $s = [];
    foreach ($data as $k => $v) {
        $k   = '`' . $k . '`';
        $v   = queryValueConvert($v);
        $s[] = $k . ' = ' . $v;
    }
    return implode(', ', $s);
}

/**
 * @param $parent
 * @param array $with
 * @return string
 *
 * @var $parent
 *
 */
function queryJoin($parent, $with = [])
{
    if (empty($with)) return '';
    $table = array_shift($with);
    if (!$table) return '';
    if (is_array($table)) {
        $q = queryJoin($parent, $table);
        foreach ($with as $item) $q .= queryJoin($parent, $item);
        return $q;
    }
    $type = '';
    if (in_array($table, ['left', 'inner', 'outer'])) {
        $type  = $table;
        $table = array_shift($with);
        if (!$table) return '';
    }
    $q  = ' ' . $type . ' join `' . $table . '` ';
    $on = [];
    foreach ($with as $k => $item) {
        if (is_integer($k)) $on[] = $item;
        if (is_string($k)) $on[] = '`' . $table . '`.`' . $k . '` = `' . $parent . '`.`' . $item . '`';
    }
    if (!empty($on)) $q .= ' on ' . implode(' and ', $on) . ' ';
    return $q;
}

function queryGroup($group = [])
{
    if (empty($group)) return '';
    foreach ($group as &$item) $item = '`' . trim($item, '`') . '`';
    return ' group by ' . implode(', ', $group) . ' ';
}


/**
 * @param string $q
 * @return array
 */
function queryResult(string $q)
{
    global $connection;
    $qq = mysqli_query($connection, $q);
    queryErrorLog($q);
    if ($qq instanceof mysqli_result) {
        $res = [];
        while ($data = mysqli_fetch_assoc($qq)) $res[] = $data;
        return $res;
    }
    return [];
}

/**
 * @param string $q
 * @return array
 */
function queryResultOne(string $q)
{
    global $connection;
    $qq = mysqli_query($connection, $q);
    queryErrorLog($q);
    if ($qq instanceof mysqli_result) {
        return mysqli_fetch_assoc($qq);
    }
    return null;
}

/**
 * @param string $q
 * @return bool
 */
function queryExec(string $q)
{
    global $connection;
    $result = (bool)mysqli_query($connection, $q);
    queryErrorLog($q);
    return $result;
}

function queryExecReturnInsertId(string $q)
{
    global $connection;
    $result = (bool)mysqli_query($connection, $q);
    return $result ? mysqli_insert_id($connection) : false;
}


function queryErrorLog($q = '')
{
    global $connection;
    $error = mysqli_error($connection);
    if ($error) {
        $debug = debug_backtrace();
        $debug = array_map(function ($item) {
            $params = array_map(function ($value) {
                $value = trim(json_encode($value), '"');
                if (strlen($value) > 50) $value = substr($value, 0, 47) . '...';
                return $value;
            }, $item['args']);
            return $item['file'] . ':' . $item['line'] . ' ' . $item['function'] . '(' . implode(', ', $params) . ')';
        }, $debug);
        $log   = '[' . date('Y-m-d H:i:s') . '] ' . $error . PHP_EOL . $q . PHP_EOL . implode(PHP_EOL, $debug) . PHP_EOL . PHP_EOL;
        $f     = fopen(__DIR__ . '/../_log/sql.log', 'a+');
        fwrite($f, $log);
        fclose($f);
    }
}

function describeTable($table)
{
    global $connection;
    $tableData = queryResult("describe " . $table);
    $fields = [];
    foreach ($tableData as $fieldData) {
        $fields[] = "`{$table}`.`" . $fieldData['Field'] . "`";
    }
    return implode(",", $fields);
}
