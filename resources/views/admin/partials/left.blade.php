
  <div id="nav"> 
    <!--logo start-->
    <div class="profile" style="height:75px !important;">
      <div class="logo" style="margin:0px; margin-top:28px;"><a href="dashboard"><img style="width:100px;" src="shared_images/logo.png" alt=""></a></div>
    </div><!--logo end--> 
    
    <!--navigation start-->
    <ul class="navigation">
    <?php 
      $route = basename($_SERVER['REQUEST_URI']); 
    ?>
      <li><a <?php if($route == 'dashboard') echo 'class="active"'; ?> href="dashboard"><i class="fa fa-home"></i><span>Dashboard</span></a></li>
      <li><a <?php if($route == 'users') echo 'class="active"'; ?> href="users"><i class="fa fa-group"></i><span>Users</span></a></li>      
      <li><a <?php if($route == 'candidates') echo 'class="active"'; ?> href="candidates"><i class="fa fa-male"></i><span>Candidates</span></a></li>      
      <li><a <?php if($route == 'import') echo 'class="active"'; ?> href="import"><i class="fa fa-download"></i><span>Import</span></a></li>      
      <?php
      $userData = \Session::get('user');

      if($userData['role']['type'] == 'admin')
      {
      ?>
        <li><a <?php if($route == 'backup') echo 'class="active"'; ?> href="backup"><i class="fa fa-floppy-o"></i><span>Backup</span></a></li>      

      <?php        
      }
      ?>

      <!-- <li class="sub"> <a href="#"><i class="fa fa-smile-o"></i><span>UI Elements</span></a>
        <ul class="navigation-sub">
          <li><a href="buttons.html"><i class="fa fa-power-off"></i><span>Button</span></a></li>
          <li><a href="grids.html"><i class="fa fa-columns"></i><span>Grid</span></a></li>
          <li><a href="icons.html"><i class="fa fa-flag"></i><span>Icon</span></a></li>
          <li><a href="tab-accordions.html"><i class="fa fa-plus-square-o"></i><span>Tab / Accordion</span></a></li>
          <li><a href="nestable.html"><i class="fa  fa-arrow-circle-o-down"></i><span>Nestable</span></a></li>
          <li><a href="slider.html"><i class="fa fa-font"></i><span>Slider</span></a></li>
          <li><a href="timeline.html"><i class="fa fa-filter"></i><span>Timeline</span></a></li>
          <li><a href="gallery.html"><i class="fa fa-picture-o"></i><span>Gallery</span></a></li>
        </ul>
      </li>
      <li class="sub"><a href="#"><i class="fa fa-list-alt"></i><span>Forms</span></a>
        <ul class="navigation-sub">
          <li><a href="form-components.html"><i class="fa fa-table"></i><span>Components</span></a></li>
          <li><a href="form-validation.html"><i class="fa fa-leaf"></i><span>Validation</span></a></li>
          <li><a href="form-wizard.html"><i class="fa fa-th"></i><span>Wizard</span></a></li>
          <li><a href="input-mask.html"><i class="fa fa-laptop"></i><span>Input Mask</span></a></li>
          <li><a href="muliti-upload.html"><i class="fa fa-files-o"></i><span>Multi Upload</span></a></li>
        </ul>
      </li>
      <li class="sub"><a href="#"><i class="fa fa-table"></i><span>Table</span></a>
        <ul class="navigation-sub">
          <li><a href="basic-tables.html"><i class="fa fa-table"></i><span>Basic Table</span></a></li>
          <li><a href="data-tables.html"><i class="fa fa-columns"></i><span>Data Table</span></a></li>
        </ul>
      </li>
      <li><a href="fullcalendar.html"><i class="fa fa-calendar nav-icon"></i><span>Calendar</span></a></li>
      <li><a href="charts.html"><i class="fa fa-bar-chart-o"></i><span>Charts</span></a></li>
      <li class="sub"><a href="#"><i class="fa fa-folder-open-o"></i><span>Pages</span></a>
        <ul class="navigation-sub">
          <li><a href="404-error.html"><i class="fa fa-warning"></i><span>404 Error</span></a></li>
          <li><a href="500-error.html"><i class="fa fa-warning"></i><span>500 Error</span></a></li>
          <li><a href="balnk-page.html"><i class="fa fa-copy"></i><span>Blank Page</span></a></li>
          <li><a href="profile.html"><i class="fa fa-user"></i><span>Profile</span></a></li>
          <li><a href="login.html"><i class="fa fa-sign-out"></i><span>Login</span></a></li>
          <li><a href="map.html"><i class="fa fa-map-marker"></i><span>Map</span></a></li>
        </ul>
      </li> -->
    </ul><!--navigation end--> 
  </div><!--Left navbar end--> 


   <div id="confirm" class="modal fade" style="z-index:99999!important">
  <div class="modal-dialog">
    <div class="modal-content">
      <!-- dialog body -->



      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalLabel">Confirmation</h4>
      </div>
  
      <div class="modal-body">
          <p>Are you sure?</p>
      </div>
      
      <!-- dialog buttons -->
      <div class="modal-footer">

      <button type="button" data-dismiss="modal" class="btn btn-primary" id="delete">Yes</button>
      <button type="button" data-dismiss="modal" class="btn">No</button>
 
      </div>
    </div>
  </div>
</div>


   <div id="undelete_request" class="modal fade" style="z-index:99999!important;">
  <div class="modal-dialog">
    <div class="modal-content">
      <!-- dialog body -->



      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalLabel">Deleted Candidate</h4>
      </div>
  
      <div class="modal-body">
          <p>This candidate is deleted by another User. Click on Send Request to request admin to restore the candidate.</p>
      </div>
      
      <!-- dialog buttons -->
      <div class="modal-footer">

      <button type="button" data-dismiss="modal" class="btn btn-primary" id="undel_btn">Send Request</button>
      <button type="button" data-dismiss="modal" class="btn">Cancel</button>
 
      </div>
    </div>
  </div>
</div>