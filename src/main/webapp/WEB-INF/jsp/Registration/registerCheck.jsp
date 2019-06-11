<%@ page import="com.team04.musiccloud.auth.Account" %>
<%@ page import="com.team04.musiccloud.db.AccountCustomRepository" %>
<%@ page import="com.mongodb.MongoWriteException" %>
<%@ page import="com.team04.musiccloud.auth.EmailServiceImplement" %>
<%@ page import="com.mongodb.MongoTimeoutException" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!doctype html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <title>register</title>
    <link rel="stylesheet" href="/css/login.css">
    <style rel="stylesheet">
        html {
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<%
    Account account = new Account();
    AccountCustomRepository accountRepository = new AccountCustomRepository();
    EmailServiceImplement service = new EmailServiceImplement();
    String name = request.getParameter("name");
    String password = request.getParameter("password");
    String cpassword = request.getParameter("cpassword");
    String email = request.getParameter("email");

    if(password.equals(cpassword)) {
        account.setName(name);
        account.setPassword(password);
        account.encodePassword();
        account.setEmail(email);
        account.setApproval(false);
        service.sendAuthMail(account);

        //중복 가입 방지
        try{
            accountRepository.registerAccount(account);
        }catch(MongoWriteException e){
            out.println("<script>alert('This email is already registered');" +
                    "location.href=\"login\"</script>");
        }catch(MongoTimeoutException e){
            out.println("<script>alert('Connection Error');" +
                    "location.href=\"login\"</script>");
        }

        out.println("<script>alert('Registration Complete!');</script>");
    }
    else{
        out.println("<script>alert('Password does not match. Please check your password again');" +
                "location.href=\"register\"</script>");
    }

%>

<body>
<!-- Form-->
<div class="form">
    <div class="form-toggle"></div>
    <div class="form-panel one">
        <div class="form-header">
            <h1>Registration Complete!</h1>
        </div>
        <div class="form-content">
            <form:form action="login" method="post">
                <div class="form-group">
                    <button type="submit">Go back to Login page</button>
                </div>
            </form:form>
        </div>
    </div>
</div>


</body>
</html>
