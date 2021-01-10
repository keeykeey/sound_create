#https://docs.djangoproject.com/ja/3.1/topics/testing/overview/#writing-tests

from django.test import TestCase
from ..models import CustomUser,UserRelations

#test for "CustomUser" Models

_username = [
    'jony','mickel','pink floyd','rollingStones'
    'takahashi','石川裕太','カロリーナ','たかはしのちょうなん','TAKAHASHI',
    'play@dogs-park','meh-gan#aaa','woo++woo','πismyfavorite','çç√[]!/><'
]

_email = [i + '@gmail.com' for i in _username ]

_password = [
    '(++#465Asoak','wowrADAx','oooooooo','Qza%cvf#s','vv{-?//}ghe',
    '123456789','qwerasdf','password','77777777','sameas@gmail.com',
    '©ßåøˆ˚∆µ˜˙','peterpanisachildthatcanflyusesmagicandmore','.','a a','45'
]

class CustomUserTestCase(TestCase):
    def setUp(self):
        for i in range(len(_username)):
            CustomUser.objects.create(
                username=_username[i],
                email=_email[i],
                password=_password[i]
            )

    def test_is_user_sat_up(self):
        for i in range(len(_username)):
            getUser = CustomUser.objects.get(username=_username[i])
            self.assertEqual(getUser.username==_username[i],True)
            self.assertEqual(getUser.email == _email[i],True)
            self.assertEqual(getUser.password == _password[i],True)

class UserRelationsTestCase(TestCase):
    def setUp(self):
        for i in range(2):
            CustomUser.objects.create(
                username=_username[i],
                email=_email[i],
                password=_password[i]
            )
        follower = CustomUser.objects.get(username=_username[0])
        followee = CustomUser.objects.get(username=_username[1])

        UserRelations.objects.create(
            follower = follower,
            followee = followee
        )

    def testRelations(self):
        follower = CustomUser.objects.get(username=_username[0])
        followee = CustomUser.objects.get(username=_username[1])

        getRelation = UserRelations.objects.get(follower=follower.id)

        self.assertEqual(getRelation.follower == follower,True)
        self.assertEqual(getRelation.followee == followee,True)
