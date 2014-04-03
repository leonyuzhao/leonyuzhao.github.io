<%@ Page Language="C#" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<script runat="server">
  
  int boardSize = 128;
  double speed = 0.1; // second
  
  protected void Page_Load(object sender, EventArgs e)
  {
    StringBuilder sb = new StringBuilder();
    sb.AppendLine("<table>");
    int pos = 0;
    for (int i = 0; i < boardSize; i++)
    {
      sb.AppendLine("<tr>");
      for (int j = 0; j < boardSize; j++)
      {
        sb.AppendLine(string.Format("<td id='cell_{0}' class='Cell'></td>", pos));
        pos++;
      }
      sb.AppendLine("</tr>");
    }
    sb.AppendLine("</table>");
    boardStr.Text = sb.ToString();
  }

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="js/LaugtonAntEngine.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
      <asp:Literal ID="boardStr" runat="server" ></asp:Literal>      
    </div>
    </form>
</body>
</html>

<style type="text/css">
  TABLE 
  {
    border-collapse: collapse;  
  }
  TD.Cell
  {
    border: solid 1px black;
    width: 1px;
    height: 1px;
  }
  TD.Full
  {
    background-color: Black;
  }  
</style>

<script type="text/javascript">
  
  $(document).ready(function() {
    var size = <%=boardSize %>;
    var speed = <%=speed %>;
    
    var e1 = new LangtonAntEngine(size, 'cell_', 'Full');
    var e2 = new LangtonAntEngine(size, 'cell_', 'Full');
    var e3 = new LangtonAntEngine(size, 'cell_', 'Full');
    var e4 = new LangtonAntEngine(size, 'cell_', 'Full');
    
    e1.Move();  
    e2.Move();  
    e3.Move();  
    e4.Move();  
    var sec = this.speed * 1000;
    setInterval(function (){
      e1.Move();  
      e2.Move();  
      e3.Move();  
      e4.Move();  
    }, sec);   
  });
  
</script>
