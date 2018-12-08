package servlets;

import csv.Csv;
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
public class CsvServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("se ha llegado al servlet");

        //Crear objeto File (ponerlo en f)
        ServletContext context = getServletContext();
        String fullPath = context.getRealPath("/conf.csv");
        String xmlPath = context.getRealPath("/conf.xml");
        File file = new File(fullPath);
        File filexml = new File(xmlPath);

        //parsear el fichero 
        Jaxb jaxb = new Jaxb();
        Configuraciones config = null;
        try {
            config = Csv.read(file);
        } catch (Exception ex) {
            Logger.getLogger(CsvServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        try {
            //guardar el objeto recuperado del csv al xml
            jaxb.writeXml(config, filexml);
        } catch (JAXBException ex) {
            System.out.println("No se pudo guardar en el xml");
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
