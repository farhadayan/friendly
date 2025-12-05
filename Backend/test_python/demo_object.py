class computer:
    clsVar="test cls var"
    def __init__(self, cpu, ram):
        self.cpu=cpu
        self.ram=ram

    def config(self):
        print("Cpu:",self.cpu,"RAM:",self.ram,self.clsVar)
    


com1=computer("amd",12)

#print(type(com1))
computer.config(com1)