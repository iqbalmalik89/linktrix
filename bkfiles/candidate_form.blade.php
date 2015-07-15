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


        <div class="col-md-12"> 
            <!--box-info start-->
            <div class="box-info">
              <h3>Basic Information</h3>
              <hr>
              <!--form-horizontal row-border start-->
              <form action="" class="form-horizontal row-border">
              
              <!--form-group start-->
              <div class="form-group">
                <label class="col-sm-3 control-label">NAME AS IN NRIC: ( UNDERLINE SURNAME )</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control">
                </div>
              </div>
              <!--form-group end--> 

              <div class="form-group">
                <label class="col-sm-1 control-label">TEL (HP)</label>
                <div class="col-sm-2">
                  <input type="password" class="form-control">
                </div>

                <label class="col-sm-2 control-label">DATE OF BIRTH</label>
                <div class="col-sm-2">
                  <input type="password" class="form-control">
                </div>

                <label class="col-sm-1 control-label">ADDRESS</label>
                <div class="col-sm-4">
                  <input type="password" class="form-control">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-1 control-label">NRIC NO</label>
                <div class="col-sm-2">
                  <input type="password" class="form-control">
                </div>

                <label class="col-sm-2 control-label">CITIZENSHIP</label>
                <div class="col-sm-2">
                  <input type="password" class="form-control">
                </div>

                <label class="col-sm-1 control-label">EMAIL</label>
                <div class="col-sm-4">
                  <input type="password" class="form-control">
                </div>
              </div>

             <div class="form-group">
                <label class="col-sm-2 control-label">MARITAL STATUS</label>
                  <div class="col-sm-3">
                    <label class="radio-inline">
                      <input type="radio" id="inlineradio1" value="option1">
                      Single </label>
                    <label class="radio-inline">
                      <input type="radio" id="inlineradio2" value="option2">
                      Married </label>
                    <label class="radio-inline">
                      <input type="radio" id="inlineradio3" value="option3">
                      Divorced </label>
                </div>

                <label class="col-sm-1 control-label">NATIONALITY</label>
                <div class="col-sm-2">
                  <select class="form-control">

                  </select>
                </div>

                <label class="col-sm-1 control-label">GENDER</label>
                <div class="col-sm-2">
                    <label class="radio-inline">
                      <input type="radio" id="inlineradio1" value="option1">
                      Male </label>
                    <label class="radio-inline">
                      <input type="radio" id="inlineradio2" value="option2">
                      Female </label>
                </div>
              </div>


                   

              <!--form-group start-->
              <!--form-group end--> 
              <!--form-group start-->
              <div class="form-group">
                <label class="col-sm-3 control-label">Textarea</label>
                <div class="col-sm-9">
                  <textarea class="form-control"></textarea>
                </div>
              </div>
              <!--form-group end-->
              </form>
              <!--form-horizontal row-border end--> 
              <!--row start-->
              <div class="row">
                <div class="col-sm-9 col-sm-offset-3">
                  <div class="btn-toolbar">
                    <button class="btn-primary btn">Submit</button>
                    <button class="btn-default btn">Cancel</button>
                  </div>
                </div>
              </div>
              <!--row end--> 
            </div>
            <!--box-info end--> 
          </div>              
            </div>
          </div>
          
        </div><!--row end-->

        

      </div><!--scrollable wrapper end--> 
    </div><!--margin-container end--> 
  </div><!--main end--> 
</div><!--layout-container end--> 

<script>
<?php $user = \Session::get('user'); ?>
var roleId = <?php echo $user['role_id']; ?>
alert(roleId);
</script>

</body>
</html>