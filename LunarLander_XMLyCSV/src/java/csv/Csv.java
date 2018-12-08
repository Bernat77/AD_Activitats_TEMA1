/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package csv;

import generated.Configuraciones;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

/**
 *
 * @author berna
 */
public class Csv {

    public static Configuraciones read(File file) throws Exception {

        Configuraciones config = new Configuraciones();
        BufferedReader br = new BufferedReader(new FileReader(file));
        String line = null;

        for (int i = 0; (line = br.readLine()) != null; i++) {

            if (i != 0) {
                String[] datos = line.split(",");
                Configuraciones.Config conf = new Configuraciones.Config();
                conf.setId((byte)i);
                conf.setName(datos[0]);
                conf.setDif(datos[1]);
                conf.setNav(Byte.parseByte(datos[2]));
                
                config.getConfig().add(conf);
                
            }
        }
        br.close();
        return config;
    }
}
