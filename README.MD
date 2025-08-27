Questão:1
GlusterFS: sistema de arquivos de armazenamento conectado à rede que lhe permite agrupar recursos de armazenamento de várias máquinas. Desta forma, isso permite que você trate vários dispositivos de armazenamento que são distribuídos entre vários computadores como uma unidade única e mais poderosa. O GlusterFS também lhe dá a liberdade de criar diferentes tipos de configurações de armazenamento, muitas das quais são similares em funcionamento aos níveis RAID. Por exemplo, você pode distribuir os dados em diferentes nós no cluster, ou implementar redundância para uma melhor disponibilidade de dados.
 
Objetivos: criar uma matriz de armazenamento em clusters redundante, também conhecida como um sistema de arquivos distribuído ou, como ela está referida na documentação do GlusterFS, uma Trusted Storage Pool (pool de armazenamento confiável). Isso irá proporcionar funcionalidades semelhantes a uma configuração RAID espelhada pela rede: cada servidor independente irá conter sua própria cópia dos dados, permitindo que suas aplicações acessem qualquer cópia, ajudando assim a distribuir sua carga de leitura.
 
Identificação e atribuição de cada maquina virtual:
```
nano /etc/hostname
```
gluster0 Servidor
gluster1 Servidor
gluster2 Cliente


``` 
``` 
sudo nano /etc/hosts
``` 
. . .
127.0.0.1       localhost
```
first_ip_address gluster0.satc.net.br gluster0
second_ip_address gluster1.satc.net.br gluster1
third_ip_address gluster2.satc.net.br gluster2
 ```
Nos três servidores rode o seguinte comando para adicionar o reposítório do gluster no ubuntu:
```
sudo add-apt-repository ppa:gluster/glusterfs-7
``` 
``` 
sudo apt update
 ````
No gluster0 e o gluster1, instale o pacote de servidor do GlusterFS digitando:
```
sudo apt install glusterfs-server
```
```
sudo systemctl start glusterd.service
```
```
sudo systemctl enable glusterd.service
```
```
sudo systemctl status glusterd.service
 ```


O comando a  seguir diz ao gluster0 para confiar no gluster1 e registrá-lo como parte de sua pool de armazenamento. Pode ser feito também no gluster1 para o gluster0, nao precisando executar nos dois.
Se bem sucedido, o comando retornará o resultado "peer probe: success". Então, estando no gluster0 executar o comando: 


``` 
sudo gluster peer probe gluster1
```


Para verificar se os nós estão se comunicando a qualquer momento:


```
sudo gluster peer status
 ```


Criando um volume de armazenamento com o comando "gluster volume create". Neste caso vamos criar um volume chamado "volume1" do tipo replica entre dois servidores.
```
sudo gluster volume create volume1 replica 2 gluster0.satc.net.br:/gluster-storage 
```


```
gluster1.satc.net.br:/gluster-storage force
```


Se a saída do comando for "volume create: volume1: success: please start the volume to access data", esta tudo certo.
 
Iniciar o volume e torná-lo disponível para uso executando o seguinte comando novamente a partir de um dos seus servidores do Gluster:


```
sudo gluster volume start volume1
```


A saída seria "volume start: volume1: success".
 
Verifique se o volume está online:
```
sudo gluster volume status
```
 
No cliente devemos instalar e configurar alguns componentes, além de antes instalar o repositório office do gluster no ubuntu.
```
sudo apt install glusterfs-client
```
```
sudo mkdir /storage-pool
```


```
sudo mount -t glusterfs gluster0.satc.net.br:/volume1 /storage-pool
```




```
df
 ```
Testando na maquina cliente.
```
 cd /storage-pool
```


```
sudo touch file_{0..9}.test
```


```
ls /gluster-storage
 ```


Obtendo informações sobre sua pool de armazenamento com comandos do GlusterFS


```
sudo gluster volume info
```


```
sudo gluster peer status
 ```


Se quiser informações detalhadas sobre como cada nó está desempenhando, faça um perfil de volume digitando:
```
sudo gluster volume profile volume_name start
 ```


Quando este comando for concluído, obtenha as informações que foram reunidas digitando:
```
sudo gluster volume profile volume_name info
```


--------------------------------------------------------------------------------------------------
Esta parte é para configuração de rede no linux.


Para utilizar o Netplan no linux
Tutorial Netplan: https://netplan.readthedocs.io/en/stable/netplan-tutorial/


Se não quiser utilizar o netplan, este pode ser substituido pelo ifupdown que é mais facil de configurar a rede.


Removendo netplan.io e NetworkManager. Instalando o ifupdown.
```
apt install ifupdown
```


```
apt purge network-manager netplan.io
```


```
rm -rf /etc/netplan/*.yml
```
Configurando a rede em /etc/network/interfaces acrescentar
----------------
auto lo
iface lo inet loopback
auto enp0s3
iface enp0s3 inet dhcp


auto enp0s8
iface enp0s8 inet static
address 192.168.36.1
netmask 255.255.255.0
----------------


No caso acima o device de rede enp0s3 e enp0s8 depende de cada computador.


O que deve ser entregue: Evidências de realização do trabalho, imagem das partições montadas e arquivos sendo gravados.
