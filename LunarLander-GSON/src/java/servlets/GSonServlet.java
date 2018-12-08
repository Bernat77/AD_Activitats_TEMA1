package servlets;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import configuraciones.Configuracion;
import java.lang.reflect.Type;
import java.util.List;

public class GSonServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        ServletContext context = getServletContext();
        String fullPath = context.getRealPath("/conf.json");

        Gson gson = new Gson();

        Type listType = new TypeToken<List<Configuracion>>() {
        }.getType();

        List<Configuracion> listaConfiguraciones = gson.fromJson(new FileReader(fullPath), listType);

        String s = gson.toJson(listaConfiguraciones);

//        JsonReader reader;
//        reader = new JsonReader(new FileReader(fullPath));

        response.setContentType("application/json");
        PrintWriter pw = response.getWriter();
        pw.println(s);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            //creacion de la configuracion junto los datos enviados
            int id = Integer.parseInt(request.getParameter("id"));
            int nave = Integer.parseInt(request.getParameter("nave"));
            int dificultad = Integer.parseInt(request.getParameter("dificultad"));

            //añadir los atributos al objeto configuraciones
            Configuracion nuevaConfiguracion = new Configuracion();
            nuevaConfiguracion.setId(id);
            nuevaConfiguracion.setNave(nave);
            nuevaConfiguracion.setDificultad(dificultad);

            // Leer la lista de configuraciones del config.json
            ServletContext context = getServletContext();
            String fullPath = context.getRealPath("/conf.json");

            Gson gson = new GsonBuilder()
                    .setPrettyPrinting()
                    .disableHtmlEscaping()
                    .create();

            Type listType = new TypeToken<List<Configuracion>>() {
            }.getType();
            List<Configuracion> listaConfiguraciones = gson.fromJson(new FileReader(fullPath), listType);

            // Añadir la nueva configuracion a la lista
            listaConfiguraciones.add(nuevaConfiguracion);

            //
            FileWriter writer = new FileWriter(fullPath);
            gson.toJson(listaConfiguraciones, writer);
            writer.close();

            response.setContentType("application/json");
            PrintWriter pw = response.getWriter();
            pw.println("{\"mess\":\"Configuracion guardada correctamente :D\"}");

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            PrintWriter pw = response.getWriter();
            pw.println("{\"error\":\"Configuracion no ha sido guardada D:\"}");
        }
    }
}
