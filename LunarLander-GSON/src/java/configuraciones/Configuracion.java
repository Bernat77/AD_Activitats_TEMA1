/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package configuraciones;

/**
 *
 * @author windeveloper
 */
public class Configuracion {

    private int id;
    private int dificultad;
    private int nave;

    public int getId() {
        return this.id;
    }

    public int getDificultad() {
        return dificultad;
    }

    public int getNave() {
        return nave;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDificultad(int dificultad) {
        this.dificultad = dificultad;
    }

    public void setNave(int nave) {
        this.nave = nave;
    }

}
