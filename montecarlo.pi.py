import random

#Se define la funcion
def Pi(limite=10000000):
    dentro = 0
    contador = 0

    #Se hace un ciclo hasta que contador sea igual al limite
    while contador < limite:
        #Se calcula  que los puntos esten dentro del radio del circulo
        #Si es asi se incrementa la variable dentro. y luego se incrementa
        #contador para pasar al siguiente ciclo.
        if ((random.random()**2 + random.random()**2) <= 1):
            dentro += 1
        contador += 1

    #Se retorna el resultado de la cantida de puntos dentro del circulo
    #entre el limite por 4.
    return 4.0*float(dentro)/limite

#Se define la funcion
def interes(limite=10000000):
    dentro = 0
    contador = 0

    #Se hace un ciclo hasta que contador sea igual al limite
    while contador < limite:
        #Se calcula  que los puntos esten dentro del radio del circulo
        #Si es asi se incrementa la variable dentro. y luego se incrementa
        #contador para pasar al siguiente ciclo.
        if ((random.random()**2 + random.random()**2) <= 1):
            dentro += 1
        contador += 1

    #Se retorna el resultado de la cantida de puntos dentro del circulo
    #entre el limite por 4.
    return float(dentro)
    # return 4.0*float(dentro)/limite

if __name__ == "__main__":
    n = (10000, 1000000)
    for i in n:
        print ("El valor de pi es: {0:2.8f} para n {1}".format(interes(i),i))
