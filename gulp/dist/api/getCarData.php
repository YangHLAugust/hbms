<?php
    $username = $_GET['username'];

    #链接数据库
    $con = mysqli_connect('localhost','root','123456','hbms');

    # 设置SQL语句
    $sql = "SELECT * FROM `car` WHERE `username`='$username'";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('error for mysql' . mysqli_error());
    }

    $arr = array();
    # 拿出数据库数据
    while( $row = mysqli_fetch_assoc($res)){
        array_push($arr,$row);
    }
    print_r(json_encode($arr));
?>