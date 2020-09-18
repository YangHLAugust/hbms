<?php
    # 1、连接数据库
    $con = mysqli_connect('localhost','root','123456','hbms');

    # 2、input传过来的数据
    $username = $_POST['username'];
    $password = $_POST['password'];
    $tele = $_POST['tele'];

    # 3、表匹配 (查询)
    $sql = "SELECT * FROM `user` WHERE `username`='$username'";
    
    # 4、数据库SQL匹配操作(执行sql语句)
    $res = mysqli_query($con,$sql);

    # 5、纠错
    if(!$res){
        die('error'.mysqli_error());
    }

    # 6、结果处理为json数据
    $row = mysqli_fetch_assoc($res);

    # 7、判断是否存在，如果存在，就返回登录页面，不存在就将数据添加到数据库中,再返回登录界面

    if ($row) {
        // 没有匹配的数据 登录失败
        echo json_encode(array(
          "code" => 0,
          "message" => "注册失败，用户名已经存在"
        ));
      }
    else{
       $res2 = mysqli_query($con,"INSERT INTO `user` (`username`,`password`,`tele`) VALUES('$username','$password','$tele')");
       if($res2){
        echo json_encode(array(
        'code'=>1,
        'username'=>$username,
        'message'=>'注册成功'
         ));
       }
    }
    # 8、关闭数据库
    mysqli_close($con);
   
?>