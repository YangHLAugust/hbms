<?php
    // 获取传递过来的用名
    $username = $_GET['username'];

    $con = mysqli_connect('localhost','root','123456','hbms');

    $sql = "DELETE FROM `car` WHERE  `username` = '$username'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        echo json_encode(array("code"=>false,"msg"=>"删除数据失败"));
    }else{
        echo json_encode(array("code"=>$res,"msg"=>"删除数据成功"));
    }
?>