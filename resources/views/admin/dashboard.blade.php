<!DOCTYPE html>
<html>
<head>
<title>{{$page_title}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
  @include('admin.partials.asset')

</head>
<body>
<!--layout-container start-->
<div id="layout-container"> 
  <!--Left navbar start-->
  @include('admin.partials.left')  
  
  <!--main start-->
  <div id="main">
  @include('admin.partials.nav')

    <!--margin-container start-->
    <div class="margin-container">
    <!--scrollable wrapper start-->
      <div class="scrollable wrapper">
      <!--row start-->
        <div class="row">
         <!--col-md-12 start-->
          <div class="col-md-12">
            <div class="page-heading">
              <h1>Dashboard <small>your first page</small></h1>
            </div>
          </div>
          
        </div><!--row end-->

        

      </div><!--scrollable wrapper end--> 
    </div><!--margin-container end--> 
  </div><!--main end--> 
</div><!--layout-container end--> 



</body>
</html>