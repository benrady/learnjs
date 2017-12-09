<app>

 <nav><a each={ data } href="#{ id }">{ title }</a></nav>


  <h1>Hi Riot!</h1>



  <script>
    </script>

  <style>
    :scope {
      --riot-color: #f04;
      display: block;
    }
    h1 {
      color: var(--riot-color);
      border-bottom: 1px solid var(--riot-color);
    }
  </style>
</app>