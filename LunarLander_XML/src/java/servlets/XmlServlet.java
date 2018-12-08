package servlets;

import generated.Configuraciones;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXB;
import java.io.FileWriter;
import java.io.StringWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import jaxbpackage.Jaxb;

/**
 *
 * @author windeveloper
 */
public class XmlServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("se ha llegado al servlet");

        //Crear objeto File (ponerlo en f)
        ServletContext context = getServletContext();
        String fullPath = context.getRealPath("/conf.xml");
        File file = new File(fullPath);

        //parsear el fichero 
        Jaxb jaxb = new Jaxb();
        Configuraciones config = null;
        try {
            config = jaxb.readXml(file);
        } catch (JAXBException ex) {
            System.out.println("Error: " + ex.getMessage());
        }

        //Pasar a String (Marshall)
        //marshall object to string xml+
        StringWriter sw = new StringWriter();
        JAXB.marshal(config, sw);
        String xmlString = sw.toString();

        //Expulsar text/xml
        response.setContentType("text/xml");
        PrintWriter pw = response.getWriter();
        pw.println(xmlString);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {

            String nombre = request.getParameter("name");
            String dificultad = request.getParameter("dif");
            byte nave =(byte) Integer.parseInt(request.getParameter("nav"));

            ServletContext context = getServletContext();
            String fullPath = context.getRealPath("/conf.xml");
            File file = new File(fullPath);

            //parsear el fichero
            Jaxb jaxb = new Jaxb();
            Configuraciones conf = jaxb.readXml(file);

            Configuraciones.Config con = new Configuraciones.Config(nombre, dificultad, nave);
            con.setId((byte)(conf.getConfig().size()+1));
            conf.getConfig().add(con);

            jaxb.writeXml(conf, file);

            response.setContentType("application/json");
            PrintWriter pw = response.getWriter();
            pw.println("{\"mess\":\"Se ha guardado correctamente\"}");

        } catch (Exception e) {

            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            PrintWriter pw = response.getWriter();
            pw.println("{\"error\":\"Ha sido imposible guardar los datos\"}");

        }

    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
