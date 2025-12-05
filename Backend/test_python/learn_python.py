# nums=1
# print(nums)

# set={1,2,3}
# print(set)

# dict={'name':'Alice', 'age':30}
# print(dict['age'])

# tuple=(1,2,3)
# print(tuple[0])

# list=[1,2,3,4,5]
# print(list[2:4])

# #not working
# keys={'a', 'b', 'c'}
# values=[1, 2, 3]
# # my_dict = dict(zip(keys, values))
# # print(my_dict)

# values.pop(0)
# print(values)

# keys.remove('a')
# keys
# print(keys)


# a=10
# b=10
# print(id(b))
# print(id(a))

# def greet(name):
#     return f"Hello, {name}!"
# print(greet("Bob"))

# #data types
# x=5
# print(type(x))

# y=3.14
# print(type(y))

# name="John"
# print(type(name))

# is_student=True
# print(type(is_student))

# fruits=["apple", "banana", "cherry"]
# print(type(fruits))

# person={"name": "Alice", "age": 30}
# print(type(person))

# tup=(1, 2, 3)
# print(type(tup))

# my_dict={"a": 1, "b": 2, "c": 3}
# print(type(my_dict))

# bo=True
# print(type(bo))

# complex_num=2 + 3j
# print(type(complex_num))

# z=complex(x,y)
# print(z)

# print(type(z))
# print(z.real)
# print(z.imag)


# r=range(10)
# print(type(r))
# for i in r:
#     print(i)
# set_example={1,2,3,4,5}
# print(type(set_example))
# for s in set_example:
#     print(s)    


# frozenset_example=frozenset([1,2,3,4,5])
# print(type(frozenset_example))
# for f in frozenset_example:
#     print(f)

# bytes_example=b"Hello"
# print(type(bytes_example))
# for b in bytes_example:
#     print(b)
# bytearray_example=bytearray([65,66,67])
# print(type(bytearray_example))
# for ba in bytearray_example:
#     print(ba)
# memoryview_example=memoryview(b"Hello")
# print(type(memoryview_example))
# for mv in memoryview_example:
#     print(mv)   

# #Opearators
# a=10
# b=3
# print(a+b)  #Addition
# print(a-b)  #Subtraction
# print(a*b)  #Multiplication
# print(a/b)  #Division
# print(a//b) #Floor Division
# print(a%b)  #Modulus
# print(a**b) #Exponentiation 
# #Comparison Operators
# print(a==b)  #Equal to
# print(a!=b)  #Not equal to
# print(a> b)  #Greater than
# print(a< b)  #Less than
# print(a>=b)  #Greater than or equal to
# print(a<=b)  #Less than or equal to
# #Logical Operators
# print(a>5 and b<5)  #Logical AND
# print(a>5 or b>5)   #Logical OR
# print(not(a>5))     #Logical NOT
# #Bitwise Operators
# print(a & b)  #Bitwise AND
# print(a | b)  #Bitwise OR   
# print(a ^ b)  #Bitwise XOR
# print(~a)     #Bitwise NOT
# print(a << 1) #Left Shift
# print(a >> 1) #Right Shift  
# #Assignment Operators
# c=a
# c += b  #c=c+b
# print(c)    
# c -= b  #c=c-b
# print(c)    
# c *= b  #c=c*b
# print(c)    
# c /= b  #c=c/b
# print(c)    
# c %= b  #c=c%b
# print(c)    
# c **= b #c=c**b
# print(c)    
# c //= b #c=c//b
# print(c)


#Using Math module
# from math import sqrt;

# num=36
# res=sqrt(num)
# print(res)

# #input- by default give you string
# a = input("Enter val")
# print("input is: ", a)

# name = input("Enter your name: ")
# print("Hello,", name)

# ch=input("enter character:")[0]
# print(ch)

# num= int(input("Enter number:"))#integer input 



# #match (same switch)

# match num:
#     case 1:
#         print("one")
#     case 2:
#         print("two")
    
#     case _:
#         print("none")


# #array
# from array import *

# arr1=array('i',[32,54,12,7]) #'i' means int, 'f' is float, 'd' is double
# arr2=array(arr1.typecode,(n for n in arr1))
# arr1[2]=23
# print(arr1)
# print(arr2)
# for n in arr1:
#     print(n)

# #arguments
# def add(num1=0, num2=0): #0 default value here
#     return num1+num2

# reault=add(4,5)# i can pass no argument/1 argument or 2 arguments for default value

# #multi functions with same name but different number of arguments

# #in this case keyword arguments, num1 value will be 4 
# # and rest will value of num2 as tuple
# def add (num1, *num2):
#     print(num1)
#     print(num2)
# result=add(4,5,6,7)

# def add(num1, num2, num3, num4):
#     return num1+num2+num3


# def person(name, age):
#     print(name, age)

# person('a',20) 
# person (age=30, name='b')# keyword arguments

# #2nd arguments(keyword length arguments with ** create dictionary) 
# # taking all values with keys, single *(variable length arguments) only values
# def person(name, **kwargs): 
#     print(name)
#     for k,v in kwargs.items():
#         print(k,":",v)

# person (age=30, name='b', loc='cop', nation='bd')# keyword arguments

# a=5 #global var
# def checkVar():
#     globals()['a']=38 # here changing value for global variable(s)
#     a=2 #local var
#     print("in: ",a)

# checkVar()
# print("out:",a)

# from math import factorial as fact
# def facto(a):
#     print(fact(a))
# facto(3)

# import sys
# sys.setrecursionlimit(10)

# def recu():
#     print("hello")
#     recu()

# recu()

# def sq(num):
#     return num*num

# def cube(num):
#     return num*num*num

# def operate(num, operation):
#     result=operation(num) # when passing sq, it is sq(num)
#     print(result)

# operate(4,sq)# passing sq, sending function as parameter, when passing function not using ()

#lambda
# def add(a,b):
#     return a+b

#we can replace upper add function using lambda
# add=lambda a,b: a+b 

# print(add(2,3))

# nums=[4,5,8,12,3]

# events=list(filter(lambda n: n%2==0, nums))
# twice=list(map(lambda n:n*2,nums))

# print(twice)


# def out():
#     print("outer")

#     def inner():
#         print("inner")
    
#     return inner
# out()

# Decorators
def check_greater(func):
    print("im check")
    def wrap(a,b):
        print("im in wrap")
        if a<b:
            a,b=b,a
        return func(a,b)
    return wrap

@check_greater # using decorator, we can use multi decorator if needed
def div(x,y):
    print("im div",x,y)
    return x/y

print("div res:", div(4,8))

# special variable name

# print(globals())
# print(__name__) #by default it is main but in mudule it will return mondule name

# module
# from calc import *

# result = sub()
# print(result)
    
class Animal:
    def speak(self):
        print("Animal speaking")

class Dog(Animal):   # Dog inherits Animal
    def speak(self):
        print("Dog barks")

d = Dog()
d.speak()