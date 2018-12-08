/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jaxbpackage;

import generated.Configuraciones;
import java.io.File;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

/**
 *
 * @author windeveloper
 */
public class Jaxb {

    public Configuraciones readXml(File file) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(Configuraciones.class);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        return (Configuraciones)unmarshaller.unmarshal(file);

    }

    public void writeXml(Configuraciones conf, File file) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(Configuraciones.class);
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        marshaller.marshal(conf, file);
    }

}
