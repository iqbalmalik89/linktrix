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


<div class="scrollable wrapper">
        <div class="row">
          <div class="col-md-12">
            <div class="page-heading">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
<div class="page-error-404">
              <div class="error-symbol"> <i class="fa fa-exclamation-triangle"></i> </div>
              <div class="error-text">
                <h2>403</h2>
                <p>Access Denied!</p>
              </div>

            </div>
          </div>
        </div>
      </div>



    </div><!--margin-container end--> 
  </div><!--main end--> 
</div><!--layout-container end--> 


</body>
</html>